import React from 'react';
import Navbar from "@/components/Navbar";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProperties } from '@/hooks/use-properties';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { parseNumber } from '@/data/properties';

const BASE_INDEX_VALUE = 1000; // Starting point for the index

const IndexPage = () => {
  const { properties } = useProperties();

  const { overallIndex, overallChange, overallChangePercent, overallIndexHistory, regionalIndices } = React.useMemo(() => {
    let initialTotalMarketValue = 0;
    let currentTotalMarketValue = 0;
    const regionalData: { [key: string]: { initialValue: number; currentValue: number; history: { timestamp: number; value: number }[] } } = {};
    const combinedPriceHistoryMap = new Map<number, number>(); // timestamp -> total market value at that timestamp

    properties.forEach(p => {
      const initialPropertyValue = parseNumber(p.price);
      const currentPropertySharesValue = p.currentSharePrice * parseNumber(p.sharesOutstanding);

      initialTotalMarketValue += initialPropertyValue;
      currentTotalMarketValue += currentPropertySharesValue;

      // Aggregate regional data
      if (!regionalData[p.location]) {
        regionalData[p.location] = { initialValue: 0, currentValue: 0, history: [] };
      }
      regionalData[p.location].initialValue += initialPropertyValue;
      regionalData[p.location].currentValue += currentPropertySharesValue;

      // Aggregate overall index history
      p.priceHistory.forEach(historyPoint => {
        const valueAtPoint = historyPoint.price * parseNumber(p.sharesOutstanding);
        combinedPriceHistoryMap.set(historyPoint.timestamp, (combinedPriceHistoryMap.get(historyPoint.timestamp) || 0) + valueAtPoint);
      });
    });

    // Calculate overall index
    const overallIndex = initialTotalMarketValue > 0 ? (currentTotalMarketValue / initialTotalMarketValue) * BASE_INDEX_VALUE : BASE_INDEX_VALUE;
    const previousOverallIndexValue = overallIndexHistory.length > 1 ? overallIndexHistory[overallIndexHistory.length - 2].value : BASE_INDEX_VALUE; // Need to get previous from actual history
    const overallChange = overallIndex - previousOverallIndexValue;
    const overallChangePercent = previousOverallIndexValue > 0 ? (overallChange / previousOverallIndexValue) * 100 : 0;

    // Sort and format overall index history for chart
    const sortedTimestamps = Array.from(combinedPriceHistoryMap.keys()).sort((a, b) => a - b);
    const overallIndexHistoryFormatted = sortedTimestamps.map(timestamp => {
      const totalValueAtPoint = combinedPriceHistoryMap.get(timestamp) || 0;
      const indexValue = initialTotalMarketValue > 0 ? (totalValueAtPoint / initialTotalMarketValue) * BASE_INDEX_VALUE : BASE_INDEX_VALUE;
      return {
        name: new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        value: indexValue,
      };
    });

    // Calculate regional indices
    const calculatedRegionalIndices = Object.entries(regionalData).map(([region, data]) => {
      const regionalIndex = data.initialValue > 0 ? (data.currentValue / data.initialValue) * BASE_INDEX_VALUE : BASE_INDEX_VALUE;
      // For simplicity, we'll use the current value as the "previous" for change calculation here,
      // or we'd need to store regional history too. Let's use a simpler approach for now.
      // A more robust solution would involve storing historical regional values.
      const regionalChange = regionalIndex - BASE_INDEX_VALUE; // Compare to base for simplicity
      const regionalChangePercent = BASE_INDEX_VALUE > 0 ? (regionalChange / BASE_INDEX_VALUE) * 100 : 0;

      return {
        region,
        index: regionalIndex,
        change: regionalChange,
        changePercent: regionalChangePercent,
      };
    });

    return {
      overallIndex,
      overallChange,
      overallChangePercent,
      overallIndexHistory: overallIndexHistoryFormatted,
      regionalIndices: calculatedRegionalIndices,
    };
  }, [properties]);

  const getChangeColorClass = (change: number) => {
    if (change > 0) return 'text-green-600 dark:text-green-400';
    if (change < 0) return 'text-red-600 dark:text-red-400';
    return 'text-gray-700 dark:text-gray-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <Navbar />
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-blue-800 dark:text-blue-300">
            Casa Market Index
          </h1>

          {/* Overall Market Index */}
          <Card className="mb-12 p-6 shadow-lg bg-white dark:bg-gray-950 border-blue-200 dark:border-gray-700">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-semibold text-blue-700 dark:text-blue-200">Overall Market Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-center mb-4">
                <span className="text-5xl font-bold text-blue-800 dark:text-blue-300 mr-4">
                  {overallIndex.toFixed(2)}
                </span>
                <span className={`text-2xl font-semibold ${getChangeColorClass(overallChange)} flex items-center`}>
                  {overallChange > 0 ? <ArrowUp className="w-6 h-6 mr-1" /> : overallChange < 0 ? <ArrowDown className="w-6 h-6 mr-1" /> : null}
                  {overallChange.toFixed(2)} ({overallChangePercent.toFixed(2)}%)
                </span>
              </div>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                Reflects the aggregated performance of all properties on Casa.
              </p>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={overallIndexHistory}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" className="dark:stroke-gray-700" />
                    <XAxis dataKey="name" stroke="#6b7280" className="dark:stroke-gray-400" />
                    <YAxis stroke="#6b7280" className="dark:stroke-gray-400" domain={['auto', 'auto']} />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '0.5rem' }}
                      labelStyle={{ color: 'hsl(var(--foreground))' }}
                      itemStyle={{ color: 'hsl(var(--foreground))' }}
                      formatter={(value: number) => value.toFixed(2)}
                    />
                    <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Regional Indices */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-blue-800 dark:text-blue-300">
            Regional Indices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regionalIndices.map((regionIndex) => (
              <Card key={regionIndex.region} className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-950 border-blue-200 dark:border-gray-700">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold text-blue-700 dark:text-blue-200">{regionIndex.region} Index</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl font-bold text-blue-800 dark:text-blue-300 mr-3">
                      {regionIndex.index.toFixed(2)}
                    </span>
                    <span className={`text-xl font-semibold ${getChangeColorClass(regionIndex.change)} flex items-center`}>
                      {regionIndex.change > 0 ? <ArrowUp className="w-5 h-5 mr-1" /> : regionIndex.change < 0 ? <ArrowDown className="w-5 h-5 mr-1" /> : null}
                      {regionIndex.change.toFixed(2)} ({regionIndex.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <footer className="py-8 px-4 text-center text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800">
        <p>&copy; {new Date().getFullYear()} Casa. All rights reserved.</p>
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default IndexPage;
'use client';

import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import '@/lib/chartConfig';

interface LineChartProps {
  data: Array<{ date: string; count: number }>;
  xKey: string;
  yKey: string;
  color: string;
}

export default function LineChart({ data, xKey, yKey, color }: LineChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const formattedData = data.map(item => ({
      x: new Date(item[xKey]).getTime(), // Convert to timestamp
      y: item[yKey]
    }));

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            data: formattedData,
            borderColor: color,
            backgroundColor: color + '20',
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: '#1a1a24',
            titleColor: '#fff',
            bodyColor: '#a0aec0',
            borderColor: '#2d2d3d',
            borderWidth: 1,
            padding: 12,
            displayColors: false,
            callbacks: {
              title: (items) => {
                if (items[0]) {
                  return new Date(items[0].raw.x).toLocaleDateString();
                }
                return '';
              },
            },
          },
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              displayFormats: {
                day: 'MMM d',
              },
            },
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
            ticks: {
              color: '#718096',
              maxRotation: 0,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: '#2d2d3d',
            },
            border: {
              display: false,
            },
            ticks: {
              color: '#718096',
              padding: 10,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, xKey, yKey, color]);

  return <canvas ref={chartRef} />;
}

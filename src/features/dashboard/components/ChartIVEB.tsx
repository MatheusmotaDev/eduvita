"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getCityVulnerabilities, CityVulnerability } from "@/features/rankings/services/ivebService";
import { Loader2 } from "lucide-react";

// Registrando módulos do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function ChartIVEB() {
  const [data, setData] = useState<CityVulnerability[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Buscar top 5 capitais com mais escolas críticas
    getCityVulnerabilities().then((res) => {
      // Ordenar por número de escolas críticas e pegar os 5 piores
      const topCritical = res
        .sort((a, b) => b.criticalSchools - a.criticalSchools)
        .slice(0, 5);
      setData(topCritical);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[300px] w-full bg-white rounded-xl shadow-sm border border-neutral-200">
        <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  const chartData = {
    labels: data.map((city) => city.no_municipio),
    datasets: [
      {
        label: "Qtd. Escolas em Situação Crítica",
        data: data.map((city) => city.criticalSchools),
        backgroundColor: "rgba(239, 68, 68, 0.8)", // critical-500
        borderColor: "rgba(220, 38, 38, 1)", // critical-600
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: "Escolas Avaliadas (Amostra)",
        data: data.map((city) => city.totalSchools),
        backgroundColor: "rgba(14, 165, 233, 0.5)", // primary-500
        borderColor: "rgba(2, 132, 199, 1)", // primary-600
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 mt-6 w-full h-[400px]">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-neutral-900">
          Top 5 Capitais: Densidade de Escolas Críticas
        </h3>
        <p className="text-sm text-neutral-500">
          Comparativo entre o total de escolas amostradas e a quantidade de escolas com falhas estruturais graves.
        </p>
      </div>
      <div className="relative h-[280px] w-full">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

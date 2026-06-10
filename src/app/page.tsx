import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout";
import { DashboardClient } from "@/features/dashboard/components/DashboardClient";
import { Button } from "@/shared/ui/Button";
import { Download } from "lucide-react";
import pool from "@/shared/lib/db";

export const revalidate = 0;

export default async function Home() {
  let dbError = null;
  let metrics = {
    total: 1, noAcessCount: 0, noAcessPct: '0,0',
    psiPct: '0,0', alimPct: '0,0', verdePct: '0,0'
  };

  try {
    const totalRes = await pool.query('SELECT COUNT(*) FROM escola');
    const totalEscolas = parseInt(totalRes.rows[0].count, 10) || 1;

    const noAcessRes = await pool.query('SELECT COUNT(*) FROM infraestrutura_bem_estar WHERE in_banheiro_pne = false');
    const noAcessCount = parseInt(noAcessRes.rows[0].count, 10);

    const psiRes = await pool.query('SELECT COUNT(*) FROM profissionais_saude WHERE qt_prof_psicologo > 0');
    const psiCount = parseInt(psiRes.rows[0].count, 10);

    const alimRes = await pool.query('SELECT COUNT(*) FROM infraestrutura_alimentacao WHERE in_cozinha = true AND in_refeitorio = true');
    const alimCount = parseInt(alimRes.rows[0].count, 10);

    const verdeRes = await pool.query('SELECT COUNT(*) FROM ambiente_escolar WHERE in_area_verde = true');
    const verdeCount = parseInt(verdeRes.rows[0].count, 10);

    metrics = {
      total: totalEscolas,
      noAcessCount: noAcessCount || 0,
      noAcessPct: (((noAcessCount || 0) / totalEscolas) * 100).toFixed(1).replace('.', ','),
      psiPct: (((psiCount || 0) / totalEscolas) * 100).toFixed(1).replace('.', ','),
      alimPct: (((alimCount || 0) / totalEscolas) * 100).toFixed(1).replace('.', ','),
      verdePct: (((verdeCount || 0) / totalEscolas) * 100).toFixed(1).replace('.', ',')
    };
  } catch (err: any) {
    console.error("Erro ao buscar métricas no SSR:", err);
    dbError = err.message || String(err);
  }

  return (
    <DashboardLayout>
      {dbError && (
        <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
          <strong>Erro de Conexão com Banco (Vercel): </strong> {dbError}
          <br/>
          Verifique se a variável DATABASE_URL está configurada corretamente na Vercel e se você fez o Redeploy.
        </div>
      )}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-bold text-neutral-900">Dashboard Nacional</h1>
          <p className="text-base text-neutral-500">
            Visão consolidada da infraestrutura e bem-estar nas escolas públicas (Base: <strong>{metrics.total} unidades</strong>)
          </p>
        </div>
        <Button variant="primary">
          <Download className="mr-2 h-5 w-5" />
          Exportar Relatório
        </Button>
      </div>
      
      <DashboardClient metrics={metrics} />
    </DashboardLayout>
  );
}

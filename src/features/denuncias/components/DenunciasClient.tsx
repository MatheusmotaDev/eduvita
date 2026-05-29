"use client";

import { useEffect, useState } from "react";
import { Denuncia, getDenuncias, updateDenuncia, deleteDenuncia } from "../services/denunciaService";
import { Loader2, Trash2, Edit2, Check, X, AlertTriangle } from "lucide-react";
import { Badge } from "@/shared/ui/Badge";

export function DenunciasClient() {
  const [denuncias, setDenuncias] = useState<Denuncia[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDesc, setEditDesc] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getDenuncias();
      setDenuncias(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdate = async (id: string) => {
    try {
      await updateDenuncia(id, editDesc);
      setEditingId(null);
      loadData();
    } catch (e) {
      alert("Erro ao atualizar.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja apagar este alerta?")) return;
    try {
      await deleteDenuncia(id);
      loadData();
    } catch (e) {
      alert("Erro ao apagar.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20 bg-white rounded-xl border border-neutral-200">
        <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  if (denuncias.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-neutral-200 text-neutral-500">
        <AlertTriangle className="h-12 w-12 text-neutral-300 mb-4" />
        <p>Nenhum alerta registrado no sistema ainda.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50 text-xs uppercase text-neutral-500 border-b border-neutral-200">
              <th className="p-4">Escola</th>
              <th className="p-4">Descrição do Alerta</th>
              <th className="p-4">Data</th>
              <th className="p-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {denuncias.map((d) => (
              <tr key={d.id} className="hover:bg-neutral-50 transition-colors">
                <td className="p-4 font-medium text-neutral-900 max-w-[200px] truncate" title={d.no_entidade}>
                  {d.no_entidade}
                </td>
                <td className="p-4">
                  {editingId === d.id ? (
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={editDesc} 
                        onChange={(e) => setEditDesc(e.target.value)}
                        className="flex-1 px-3 py-1 text-sm border border-primary-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                        autoFocus
                      />
                      <button onClick={() => handleUpdate(d.id)} className="p-1 text-success-600 hover:bg-success-100 rounded">
                        <Check className="h-4 w-4" />
                      </button>
                      <button onClick={() => setEditingId(null)} className="p-1 text-critical-600 hover:bg-critical-100 rounded">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-sm text-neutral-600">{d.descricao}</span>
                  )}
                </td>
                <td className="p-4 text-sm text-neutral-500">
                  {new Date(d.created_at).toLocaleDateString("pt-BR")}
                </td>
                <td className="p-4 text-right space-x-2">
                  <button 
                    onClick={() => {
                      setEditingId(d.id);
                      setEditDesc(d.descricao);
                    }}
                    className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(d.id)}
                    className="p-2 text-critical-600 hover:bg-critical-50 rounded-lg transition-colors"
                    title="Excluir"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

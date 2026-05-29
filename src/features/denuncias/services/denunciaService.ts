import { supabase } from "@/shared/lib/supabase";

export interface Denuncia {
  id: string;
  co_entidade: number;
  no_entidade: string;
  descricao: string;
  status: string;
  created_at: string;
}

// CREATE
export async function createDenuncia(co_entidade: number, no_entidade: string, descricao: string) {
  const { data, error } = await supabase
    .from("denuncias")
    .insert([{ co_entidade, no_entidade, descricao }])
    .select();

  if (error) throw new Error(error.message);
  return data;
}

// READ
export async function getDenuncias() {
  const { data, error } = await supabase
    .from("denuncias")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as Denuncia[];
}

// UPDATE
export async function updateDenuncia(id: string, novaDescricao: string) {
  const { data, error } = await supabase
    .from("denuncias")
    .update({ descricao: novaDescricao })
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
}

// DELETE
export async function deleteDenuncia(id: string) {
  const { error } = await supabase
    .from("denuncias")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
  return true;
}

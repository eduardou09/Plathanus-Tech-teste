import { z } from 'zod';

export const newsFormSchema = z.object({
  title: z.string({
    required_error: "O título é obrigatório",
  })
  .min(3, "Mínimo de 3 caracteres")
  .max(100, "Máximo de 100 caracteres")
  .trim(),

  content: z.string({
    required_error: "O texto é obrigatório",
  })
  .min(1, "O texto não pode estar vazio"),

  // Validação simplificada - apenas verifica se foi selecionado
  author: z.string({
    required_error: "Selecione um autor",
  })
  .min(1, "Selecione um autor válido"),
});


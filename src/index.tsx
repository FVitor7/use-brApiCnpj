import { useCallback, useEffect, useMemo, useState } from 'react';

interface CnaesConfig {
  codigo: number | null;
  descricao: string | null;
}

interface QsaConfig {
  identificador_de_socio: number | null | string;
  nome_socio: string | null;
  cnpj_cpf_do_socio: string | null;
  codigo_qualificacao_socio: number | null;
  percentual_capital_social:  number | null;
  data_entrada_sociedade: string | null;
  cpf_representante_legal: string | number | null;
  nome_representante_legal: string | null;
  codigo_qualificacao_representante_legal: string | number | null
}

type BrAPICnpjResponse = {
  cnpj: string | number;
  identificador_matriz_filial: string | number;
  descricao_matriz_filial: string;
  razao_social: string;
  nome_fantasia: string;
  situacao_cadastral: string | number;
  descricao_situacao_cadastral: string | number;
  data_situacao_cadastral: string;
  motivo_situacao_cadastral: string;
  nome_cidade_exterior: string | null;
  codigo_natureza_juridica: string;
  data_inicio_atividade: string;
  cnae_fiscal: string | number;
  cnae_fiscal_descricao: string;
  descricao_tipo_logradouro: string;
  logradouro: string;
  numero: string | number;
  complemento: string;
  bairro: string;
  cep: string;
  uf: string;
  codigo_municipio: string | number;
  municipio: string;
  ddd_telefone_1: string | number | null;
  ddd_telefone_2: string | number | null;
  ddd_fax: string | number | null;
  qualificacao_do_responsavel: string | number;
  capital_social: string | number;
  porte: string | number;
  descricao_porte: string;
  opcao_pelo_simples: boolean;
  data_opcao_pelo_simples: string | null | number;
  data_exclusao_do_simples: string | null | number;
  opcao_pelo_mei: boolean;
  situacao_especial: null | string;
  data_situacao_especial: null | string;
  cnaes_secundarias: CnaesConfig;
  qsa: QsaConfig;
};

type UseBrAPICnpjHook = {
  cnpj: BrAPICnpjResponse;
  error: { message: string; error: any };
  loading: boolean;
};

const useBrApiCnpj = (value: string | number = ''): UseBrAPICnpjHook => {
  const [cnpj, setCnpj] = useState<BrAPICnpjResponse>({} as BrAPICnpjResponse);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const cnpjFormatted = useMemo(() => {
    return String(value)?.replace(/\W/g, '');
  }, [value]);

  const brApiCnpjURL = useMemo(() => {
    return `https://brasilapi.com.br/api/cnpj/v1/${cnpjFormatted}`;
  }, [cnpjFormatted]);

  const fetchCnpj = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(brApiCnpjURL);
      const json = await response.json();

      setCnpj(json);

      if (response?.status !== 200 || json?.error) {
        setError({ message: 'Error to load CNPJ data', error: json?.error });
        setLoading(false);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error to get CNPJ: ', err);
      setLoading(false);
      setError({ message: 'Error to get CNPJ', error: err });
    }
  }, [brApiCnpjURL]);

  useEffect(() => {
    if (cnpjFormatted.length === 14) {
      fetchCnpj();
    }
  }, [fetchCnpj, cnpjFormatted.length]);

  return { cnpj, error, loading };
};

export default useBrApiCnpj;
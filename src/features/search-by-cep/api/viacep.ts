import { Address } from '../../../entities/address/model/types';
import { API_CONFIG } from '../../../shared/config/api';

export async function searchAddressByCep(cep: string): Promise<Address> {
    const cleanCep = cep.replace(/\D/g, '');

    const response = await fetch(
        `${API_CONFIG.viacep.baseUrl}/${cleanCep}/json/`
    );

    if (!response.ok) {
        throw new Error('Erro ao buscar CEP');
    }

    const data = await response.json();

    if (data.erro) {
        throw new Error('CEP não encontrado');
    }

    return data;
}
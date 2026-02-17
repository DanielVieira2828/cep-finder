import { API_CONFIG } from '../../../shared/config/api';
import { Address } from '../../../entities/address/model/types';

export async function searchAddressByLocation(
    uf: string,
    city: string,
    street: string
): Promise<Address[]> {
    const response = await fetch(
        `${API_CONFIG.viacep.baseUrl}/${uf}/${city}/${street}/json/`
    );

    if (!response.ok) {
        throw new Error('Erro ao buscar endereço');
    }

    const data = await response.json();

    if (data.erro || data.length === 0) {
        throw new Error('Nenhum endereço encontrado');
    }

    return data;
}
export interface Member {
  id: number;
  nama: string;
  whatsapp: string;
  domisili: string;
  tipeMember: string;
  tanggalLahir?: string;
  umur?: number;
  kategoriUmur?: string;
}

export interface MemberQuery {
  page?: number;
  tipeMember?: string;
  domisili?: string;
  kategoriUmur?: string;
  minAge?: number;
  maxAge?: number;
}

export const useCrmApi = () => {
  // FEAT-10/11 + FEAT-14: list member dengan pagination & filter (domisili, tipe member)
  const getMembers = async (params: MemberQuery = {}) => {
    // TODO: GET /api/v1/crm/members?page=&tipe_member=&domisili=
    console.log('Get members', params);
    return {
      data: [] as Member[],
      total: 0,
      page: params.page ?? 1,
      perPage: 10
    };
  };

  // FEAT-12: detail 1 member (dipakai di halaman /crm/[id])
  const getMemberById = async (id: number) => {
    // TODO: GET /api/v1/crm/members/:id
    console.log('Get member detail', id);
    return null as Member | null;
  };

  return {
    getMembers,
    getMemberById
  };
};
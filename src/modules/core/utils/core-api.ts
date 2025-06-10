import http from './http';
import { parseError } from './parseError';
import { RecordResponse, UploadEntity } from './types';

export const coreApi = {
    upload: async (file: File) => {
        const response = (await http
            .post(
                '/uploads',
                { file },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
            .catch(parseError)) as RecordResponse<UploadEntity>;

        if (typeof response === 'string' || !response?.data) return;

        return response.data?.record;
    },
};

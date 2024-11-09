import * as dotenv from 'dotenv';

dotenv.config();

export const environment = {
    githubToken: process.env['API_KEY_GITHUB'] || '',
};

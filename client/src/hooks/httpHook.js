import { useState } from 'react';

export default function useHttp() {
    const [loading, setLoading] = useState(false);

    const request = async (url, method = 'GET', body = null, headers = {}) => {
        try {
            setLoading(true);
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }

            let API_URL = process.env.REACT_APP_API_URL;
            const response = await fetch(API_URL + url, { method, body, headers });
            const data = await response.json();

            if (!response.ok) throw new Error(data.errors[0].msg || `Failed to fetch ${url}`);

            setLoading(false);
            return data;
        } catch (e) {
            setLoading(false);
            throw e;
        }
    };

    return { loading, request };
}
import { http, HttpResponse } from 'msw';

export const handlers = [
    http.get('http://mockapi.pzw/todos', () => {
        return HttpResponse.json([
            {
                _id: '1',
                title: 'Buy milk',
            },
            {
                _id: '2',
                title: 'Buy eggs',
            },
            {
                _id: '3',
                title: 'Buy bread',
            },
            {
                _id: '4',
                title: 'Buy coffee',
            },
        ]);
    }),
    http.post('http://mockapi.pzw/todos', () => {
        return HttpResponse.json({});
    })
];
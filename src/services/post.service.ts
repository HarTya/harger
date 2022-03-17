import { fetchWrapper } from 'src/helpers';

export const postService = {
    create,
    publish,
    delete: deletePost
};

function create(title, content, user) {
    return fetchWrapper.post(`${process.env.API_URL}/post`, { title, content, user })
}

function publish(id) {
    return fetchWrapper.put(`${process.env.API_URL}/publish/${id}`, {id})
}

function deletePost(id) {
    return fetchWrapper.delete(`${process.env.API_URL}/post/${id}`)
}


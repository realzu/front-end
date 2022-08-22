import axios from "axios";

// 댓글 추가
export const addComment = async(artNo:number, useNo:number, repContents: string)=>{
    const res = await axios.post(`/article/${artNo}/reply`,{
        artNo,
        useNo,
        repContents
    })
    return res
}

// 댓글 목록 조회
export const getComments = async(artNo:number)=>{
    const res = await axios.get(`/article/${artNo}/reply`)
    return res 
}
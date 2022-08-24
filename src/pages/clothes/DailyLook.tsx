import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CateHeader from '../../components/CateHeader';
import Pagination from '../../components/Pagination';
import * as c from '../../styles/Category';
import { PageT, Post } from '../../types/types';

const DailyLook = () => {
    const [data, setData] = useState<Post[]>([]);

    const [region, setRegion] = useState<string>('');
    const getRegionHandler = (reg :string) => { setRegion(reg) }

    const [page, setPage] = useState<PageT>({});
    const [curPage, setCurPage] = useState(1);

    useEffect(() => {
        axios.get(`/article/list/0/${region}`, {params: {page: (curPage-1)}})
        .then(res => {
            setData(res.data.data.list)
            setPage(res.data.data.pageable)
        })
    },[region,curPage])

    return (
        <c.Container>
            <CateHeader categoryNum={0} category='데일리룩' onGetRegionNumber={getRegionHandler} />
            <c.Imgs>
                {data && (
                    data.map((art,i) => (
                        <c.Card key={i}>
                            <Link to={`/today_clothes/dailylook/${art.artNo}`}>
                                <c.Img src='/test.jpg' alt='test1'/>{/* 대기중 */}
                                <p>{art.artSubject}</p>
                                <span>{art.useNick}&nbsp;</span>
                                <span id='dis'>{art.regAddr1} {art.regAddr2}</span>
                            </Link>
                        </c.Card>
                    ))
                )}
            </c.Imgs>
            {data && (
                <Pagination curPage={curPage} setCurPage={setCurPage} totalPage={page.totalPages} totalCount={page.totalElements} size={page.size} pageCount={5}/>
            )}
        </c.Container>
    );
};

export default DailyLook;
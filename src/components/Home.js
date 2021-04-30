import styled from 'styled-components';
import ImgSlider from './ImgSlider';
import Viewers from './Viewers';
import Recommends from './Recommends';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import db from '../firebase';
import { setMovies } from '../features/movie/movieSlice';
import { selectUserName } from '../features/user/userSlice';
import { 
    selectRecommend,
    selectNewDisney,
    selectOriginals,
    selectTrending } from '../features/movie/movieSlice';

const Home = (props) => {
    const dispatch = useDispatch();
    const userName = useSelector(selectUserName);
    let recommends = [];
    let newDisney = [];
    let originals = [];
    let trending = [];

    const recommendsMovies = useSelector(selectRecommend);
    const newDisneyMovies = useSelector(selectNewDisney);
    const originalsMovies = useSelector(selectOriginals);
    const trendingMovies = useSelector(selectTrending);

    useEffect(() => {
        db.collection('movies').onSnapshot(snapshot => {
            snapshot.docs.map(doc => {
                switch (doc.data().type) {
                    case 'recommend':
                        recommends = [...recommends, {
                            id: doc.id,
                            ...doc.data()
                        }];
                        break;
                    case 'new': {
                        newDisney = [...newDisney, {
                            id: doc.id,
                            ...doc.data()
                        }];
                        break;
                    }
                    case 'original': {
                        originals = [...originals, {
                            id: doc.id,
                            ...doc.data()
                        }];
                        break;
                    }
                    case 'trending': {
                        trending = [...trending, {
                            id: doc.id,
                            ...doc.data()
                        }]
                        break;
                    };
                }
            });

            dispatch(
                setMovies({
                    recommend: recommends,
                    newDisney: newDisney,
                    originals: originals,
                    trending: trending
                })
            );
        });
    }, [userName]);

    return (
        <Container>
            <ImgSlider />
            <Viewers />
            <Recommends title={"Recommends for you"} movies={recommendsMovies}/>
            <Recommends title={'New to Disney+'} movies={newDisneyMovies}/>
            <Recommends title={'Originals'} movies={originalsMovies}/>
            <Recommends title={'Trending'} movies={trendingMovies}/>
        </Container>
    )
}

const Container = styled.main`
    position: relative;
    min-height: calc(100vh - 250px);
    overflow-x: hidden;
    display: block;
    top: 72px;
    padding: 0 calc(3.5vw + 5px);
    

    &:after {
        background: url('images/backgrounds/home-background.png') center center / cover 
        no-repeat fixed;
        content: '';
        position: absolute;
        inset: 0px;
        opacity: 1;
        z-index: -1;
    }

`;

export default Home;
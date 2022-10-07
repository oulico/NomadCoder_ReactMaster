import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex !important;
    align-items: center !important;
    padding: 20px;
    transition: color 0.2s ease-in;
    display: block;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;
const Image = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const Btn = styled.button`
  position: absolute;

  right: 0;

  line-height: 20px;
  top: 50px;
  font-size: 20px;
  width: 40px;
  height: 40px;
  padding: 10px;
  border: none;
  border-radius: 50%;
  background: none;
  color: ${(props) => props.theme.accentColor};
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.2);
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
interface ICoinsProps {}

function Coins({}: ICoinsProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const setterFn = useSetRecoilState(isDarkAtom);
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  //   const [coins, setCoins] = useState<CoinInterface[]>([]);
  //   const [loading, setLoading] = useState(true);
  //   useEffect(() => {
  //     (async () => {
  //       const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //       const json = await response.json();
  //       setCoins(json.slice(0, 100));
  //       setLoading(false);
  //     })();

  // }, []);
  //리액트 쿼리로 상단의 코드를 대신할 수 있다. 리액트 쿼리는 캐싱, 상태관리, isLoading 등 다양한 기능을 가지고 있다. 리액트 쿼리는 fetch 펑션만 가지고도 많은 정보를 건네준다. 기본적으로 유즈쿼리를 사용하면, isLoading 과 data를 준다. 캐싱을 해주기 때문에 API에 접근하지 않아서 신속한 화면 전환이 가능하다.

  return (
    <Container>
      <Header>
        <Title>COINOW</Title>
        <Btn onClick={() => setterFn((prev) => !prev)}>
          {isDark ? "☀" : "☾"}
        </Btn>
      </Header>

      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            // 인터페이스 코인을 useQuery뒤에 달아주자. 그러면 data가 무슨 타입인지 묻는 타입스크립트 에러가 사라진다. 이후에는 data가 배열이거나 undefined일 수 있다는 에러가 뜰 것이다. 그러면 data 뒤에 ?를 붙여서 optional하게 만들어주자.
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Image
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  alt="coin"
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;

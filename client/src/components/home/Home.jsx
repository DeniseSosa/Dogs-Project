// Hooks
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// funciones de las actions
import {
  getAllDogs,
  getTemperaments,
  tempAllNames,
  nameByOrigin,
  alphabeticOrder,
  orderByWeight,
} from "../../redux/actions/actions";
// componentes
import Cards from "../cards/Cards";
import Pages from "../pages/Pages";
import SearchBar from "../searchBar/SearchBar";
import CardLoading from "../card/CardLoading";
//Style
import style from "./Home.module.css";

const Home = () => {
  // Acceso al estado global dogs Copy todas las razas de perro
  const allDogs = useSelector((state) => state.dogsCopy);
  // Acceso al estado global que es la copia de los temperamentos
  const { allTempCopy } = useSelector((state) => state);
  const dispatch = useDispatch();
  // Loading
  const [loading, setLoading] = useState(false);
  // Estados locales para la paginacion
  const [dataQt, setDataQt] = useState(8); // cant de cards por page
  const [currentPage, setCurrentPage] = useState(1); // page actual

  useEffect(() => {
    const getAll = async () => {
      setLoading(true);
      dispatch(getAllDogs()); // cuando se monta el componente me traigo todos los perros para mostrarlos en las card
      await dispatch(getTemperaments()); // me traigo todos los temperamentos para hacer un selec
      setLoading(false);
    };
    getAll();
  }, [dispatch]);

  // Paginacion
  const lastIndex = currentPage * dataQt; // 1*8
  const initIndex = lastIndex - dataQt; // 8- 8
  const nDogs = allDogs.slice(initIndex, lastIndex); // toda la data
  const nPage = Math.ceil(allDogs.length / dataQt);

  const handleAll = (event) => {
    dispatch(tempAllNames(event.target.value));
    setCurrentPage(1); // aqui despacho cada action para manejar los filtros
  };
  const handleDogOrigin = (event) => {
    dispatch(nameByOrigin(event.target.value));
    setCurrentPage(1);
  };
  const handleOrder = (event) => {
    dispatch(alphabeticOrder(event.target.value));
    setCurrentPage(1);
  };
  const handleWeight = (event) => {
    dispatch(orderByWeight(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className={style.homeContainer}>
      {loading === true ? (
        <CardLoading />
      ) : (
        <>
          <SearchBar setCurrentPage={setCurrentPage} />
          <div className={style.selectDiv}>
            <select onChange={handleAll} className={style.selectors}>
              <option value=""> Temperaments:</option>
              {allTempCopy.map((temp, index) => {
                return (
                  <option value={temp.name} key={index}>
                    {temp.name}
                  </option>
                );
              })}
            </select>

            <select onChange={handleDogOrigin} className={style.selectors}>
              <option value="api">Origin:Api</option>
              <option value="db">Origin:DB</option>
            </select>

            <select onChange={handleOrder} className={style.selectors}>
              <option value="ascendent">from A to Z</option>
              <option value="desendent">from Z to A</option>
            </select>

            <select onChange={handleWeight} className={style.selectors}>
              <option value="lighter">Lighter</option>
              <option value="heavier">Heavier</option>
            </select>
          </div>
          <Link to="/form">
            <button className={style.create}> Create your own Breed</button>
          </Link>
          <Cards allDogs={nDogs} />
          <Pages // paso por props
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            nPage={nPage}
          />
      <footer>
        <p>© 2023 Mi primer sitio web</p>
        <p>
          <a href="mailto:rocio.sosa94@gmail.com">rocio.sosa94@gmail.com</a>
        </p>
        <p>
          <a href="https://www.linkedin.com/in/denise-rocio-sosa-bb82b0108">
            linkedin
          </a>
        </p>
      </footer>
        </>
      )}
    </div>
  );
};
export default Home;

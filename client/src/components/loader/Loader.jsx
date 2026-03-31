import style from "../../styles/loader.module.css";

const Loader = () => {
  return (
    <div className={style.loaderContainer}>
      <span className={style.loader}></span>
    </div>
  );
};

export default Loader;

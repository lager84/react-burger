import styles from "./loader.module.css";
import { FC } from "react";

const Loader: FC = () => {
  return <div className={styles.loader}>loading</div>;
};

export default Loader;

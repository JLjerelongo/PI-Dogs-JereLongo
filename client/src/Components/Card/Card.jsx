import React from 'react';
import styles from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({ id, name, image, temperaments, weight }) => {
  return (
    <div className={styles.card}>
      <Link to={`(detail/${id}`} className={style.link}>
        <img
        src={image}
        alt={name}
        className={StyleSheet.card_image}
        />
        <div className={styles.card_overlay}>
          <div className={styles.card_header}>
            <div className={styles.card_thumb}>
              <div>
                <h3 className={styles.card_title}>{name}</h3>
              </div>
            </div>
            <p className={styles.card_description}>
              <span className={styles.card_tagline}>{temperaments}</span>
              <span className={styles.card_status}>Peso: {weight}</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Card;
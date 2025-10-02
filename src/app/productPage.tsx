import { useEffect, useState } from "react";
import { BabolatRacketAPI } from "./api/scrapeAPI/babolat/BabolatTypes";
import styles from './styles/test.module.css';

export default function ScrapePage() {
  const [pageState, setPageState] = useState<BabolatRacketAPI>({ count: 0, products: [] })
  async function fetchData() {
    const response = await fetch('/api/scrapeAPI/babolat')
    const data = await response.json()
    setPageState(data)
  }


  useEffect(() => {
    fetchData()
  }, [])


  return <div>
    <h1>Products</h1>
    {
      pageState.count > 0 && (
        <div className={styles.grid}>
        {pageState.products.map((p, i) => (
          <article className={styles.card} key={`${p.title}-${i}`}>
            <div className={styles.thumb}>
              <img
                srcSet={p.img_url}
                sizes="(max-width: 767px) 100vw, (max-width: 1199px) 33vw, 300px"
                alt={p.title}
                loading="lazy"
              />
            </div>
            <h3 className={styles.title}>{p.title}</h3>
            <p className={styles.price}>{p.price}</p>
          </article>
        ))}
      </div>
      )
    }
    </div>;
}

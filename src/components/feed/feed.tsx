"use client";

import photosGet, { Photo } from "@/actions/photos-get";
import FeedPhotos from "./feed-fotos";
import React from "react";
import Loading from "../helper/loading";
import styles from "./feed.module.css";

export default function Feed({photos, user} : {photos: Photo[], user?: 0 | string}) {
  const [photosFeed, setPhotosFeed] = React.useState<Photo[]>(photos);
  const [page, setPage] = React.useState(1);
  const fetching = React.useRef(false);
  const [loading, setLoading] = React.useState(false);
  const [infinite, setInfinite] = React.useState(photos.length < 6 ? false : true);

  function infiniteScroll(){
    if(fetching.current) return;
    fetching.current = true;
    setLoading(true);
    setTimeout(() => {
      setPage((currentPage) => currentPage + 1);
      fetching.current = false;
      setLoading(false);
    }, 1000);
  }

  React.useEffect(()=> {
    if(page === 1) return;
    async function getPagePhotos(page:number) {
      const actionData = await photosGet({page, total: 6, user: 0}, {
        cache: "no-store"
      });
      if(actionData && actionData.data !== null){
        const {data} = actionData;
        setPhotosFeed((currentPhotos)=> [...currentPhotos, ...data]);
        if(data.length < 6) setInfinite(false);
      }
    }
    getPagePhotos(page);
  }, [page]);

  React.useEffect(()=> {
    if(infinite){
      window.addEventListener("scroll", infiniteScroll);
      window.addEventListener("wheel", infiniteScroll);
    }else {
      window.removeEventListener("scroll", infiniteScroll);
      window.removeEventListener("wheel", infiniteScroll);
    }
  }, [infinite]);

  return (
    <div>
      <FeedPhotos photos={photosFeed} />
      <div className={styles.loadingWrapper}>
        {infinite ? <Loading /> : <p>Não existe mais postagens.</p>}
      </div>
    </div>
  );
}
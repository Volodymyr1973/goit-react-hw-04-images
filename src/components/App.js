import { useState, useEffect } from 'react';
import { SearchBar } from './searchbar/SearchBar';
import { ImageGallery } from './imagegallery/ImageGallery';
// import { ImageGalleryItem } from './imagegalleryitem/ImageGalleryItem';
import { Button } from './button/Button';
import { Loader } from './loader/Loader';
import { Modal } from './modal/Modal';
import css from './App.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [name, setName] = useState('');
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [url, setUrl] = useState('');
  const [tag, setTag] = useState('');
  // const [errorFetch, setErrorFetch] = useState('');

  useEffect(() => {
    if (name !== '') {
      setIsLoader(true);
      handleFetch(name, page);
    }
  }, []);

  const handleImageName = nameSearch => {
    const newName = nameSearch.toLowerCase();
    setName(newName);
    setPage(1);
    setGallery([]);
  };

  // setTimeout встановив, виключно для того,
  // щоб можна було побачити Loader. Знаю, що
  // взагалі його не використовують

  const handleFetch = (name, page) => {
    setTimeout(() => {
      fetch(
        `https://pixabay.com/api/?q=${name}&page=${page}&key=30855873-a6914290544a804f7a5292a28&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error('Insert other name'));
        })
        .then(gallery => handleGallery(gallery))
        .catch(error => console.log(error))
        .finally(setIsLoader(false));
    }, 500);
  };

  const handleGallery = newGallery => {
    setGallery([...gallery, ...newGallery.hits]);
    setIsLoadMore(true);
  };

  // залишив на відкриття та закриття Modal дві різні функції

  const handleModalOpen = event => {
    setIsModalOpen(true);
    setUrl(event.target.dataset.large);
    setTag(event.target.dataset.tag);
  };

  const handleModalClose = event => {
    if (event.key === 'Escape' || event.target === event.currentTarget) {
      setIsModalOpen(false);
    }
  };

  // кнопка LoadMore не рендериться, якщо в галерею приходить
  // менше 12 зображень (умова в render()). Для перевірки
  // у вікні пошуку ввести, наприклад, слово "glock"

  const handleLoadMore = () => {
    setPage(page => page + 1);
  };

  // useEffect(() => {
  //   if (name !== '') {
  //     setIsLoader(true);
  //     handleFetch(name, page);
  //   }
  // }, [name, page, handleFetch]);

  return (
    <div className={css.wrapper}>
      <SearchBar onSubmit={handleImageName} />

      {gallery.length > 0 && (
        <ImageGallery gallery={gallery} open={handleModalOpen}></ImageGallery>
      )}
      {isLoader && <Loader isLoader={isLoader} />}

      {isModalOpen && <Modal url={url} tag={tag} onClick={handleModalClose} />}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {isLoadMore && gallery.length >= 12 && (
        <Button loadMore={handleLoadMore} />
      )}
    </div>
  );
};

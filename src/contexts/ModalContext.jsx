import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState({
    projectDetail: { isOpen: false, data: null },
    blogDetail: { isOpen: false, data: null },
    bookVisit: { isOpen: false, data: null },
    contactForm: { isOpen: false, data: null },
  });

  const openModal = (modalType, data = null) => {
    setModals((prev) => ({
      ...prev,
      [modalType]: { isOpen: true, data },
    }));
  };

  const closeModal = (modalType) => {
    setModals((prev) => ({
      ...prev,
      [modalType]: { isOpen: false, data: null },
    }));
  };

  const closeAllModals = () => {
    setModals({
      projectDetail: { isOpen: false, data: null },
      blogDetail: { isOpen: false, data: null },
      bookVisit: { isOpen: false, data: null },
      contactForm: { isOpen: false, data: null },
    });
  };

  return (
    <ModalContext.Provider
      value={{ modals, openModal, closeModal, closeAllModals }}
    >
      {children}
    </ModalContext.Provider>
  );
};

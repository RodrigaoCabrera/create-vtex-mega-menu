import React from 'react'

import { Category } from '../typings/creteMegaMenu'

interface Props {
  categoriesPreviewModalRef: React.RefObject<HTMLDialogElement>
  categories: Category[]
  handlerModal: () => void
}
const CategoriesPreviewModal = ({
  categoriesPreviewModalRef,
  categories,
  handlerModal,
}: Props) => {
  const hasStructureCorrectly =
    (categories?.length ?? 0) > 0 &&
    categories &&
    categories?.[0]?.hasOwnProperty('department')

  return (
    <dialog id="categoriesPreviewModal" ref={categoriesPreviewModalRef}>
      {!hasStructureCorrectly ? (
        <h3>
          El excel no tiene la estructura correcta o el formato no es el
          correcto
        </h3>
      ) : (
        <table>
          <thead>
            <tr>
              <td>departamento</td>
              <td>category</td>
              <td>subcategory</td>
            </tr>
          </thead>
          <tbody>
            {categories.map((category: Category, index: number) => {
              return (
                <tr key={index}>
                  <td>{category.department}</td>
                  <td>{category.category}</td>
                  <td>{category.subcategory}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
      <button onClick={handlerModal}>Aceptar</button>
    </dialog>
  )
}

export default CategoriesPreviewModal

import React, { FC, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageBlock, PageHeader } from 'vtex.styleguide'

import converterExcelToJson from './utils/converterExcelToJson'
import './styles.global.css'
import { Category } from './typings/creteMegaMenu'
import CategoriesPreviewModal from './components/CategoriesPreviewModal'

const CreateMegaMenu: FC = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [showExcelPreview, setShowExcelPreview] = useState<boolean>(false)

  const categoriesPreviewModalRef = useRef<HTMLDialogElement>(null)
  const handlerExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files
    const selectedFile = files ? files[0] : null
    try {
      const excelCategories = await converterExcelToJson(selectedFile)
      if (Array.isArray(excelCategories)) {
        setCategories(excelCategories)
        setShowExcelPreview(true)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  const handlerModal = () => {
    // eslint-disable-next-line no-console
    console.log(categories)
    const categoriesPreviewModal = categoriesPreviewModalRef?.current
    if (categoriesPreviewModal) {
      categoriesPreviewModal.open
        ? categoriesPreviewModal.close()
        : categoriesPreviewModal.showModal()
    }
  }

  return (
    <Layout
      pageHeader={
        <PageHeader title={<FormattedMessage id="create-mega-menu.title" />} />
      }
    >
      <PageBlock variation="full">
        <section className="container">
          <h4>Subir excel</h4>
          <div className="panel panel-primary">
            <section>
              <input
                type="file"
                id="fileUpload"
                accept=".xls,.xlsx"
                onChange={(e) => handlerExcel(e)}
              />
              {showExcelPreview && (
                <div>
                  <button onClick={handlerModal}>Abrir Modal</button>
                  <CategoriesPreviewModal
                    categoriesPreviewModalRef={categoriesPreviewModalRef}
                    categories={categories}
                    handlerModal={handlerModal}
                  />
                </div>
              )}
            </section>
          </div>
        </section>
      </PageBlock>
    </Layout>
  )
}

export default CreateMegaMenu

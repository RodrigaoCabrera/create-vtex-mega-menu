import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageBlock, PageHeader } from 'vtex.styleguide'


import './styles.global.css'

const AdminExample: FC = () => {
  return (
    <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="admin-example.title" />}
        />
      }
    >
      <PageBlock variation="full">
      </PageBlock>
    </Layout>
  )
}

export default AdminExample

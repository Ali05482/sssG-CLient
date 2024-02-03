import React from "react";
import Layout from "../../src/components/dashboard/Layout";
import MainSetting from "../../src/components/settings/mainSetting";
import FullLayout from "../../src/layouts/FullLayout";


const SettingsPage = () => {
  return (
    <FullLayout>
      <Layout>
        <MainSetting />
      </Layout>
    </FullLayout>
  );
};

export default SettingsPage;

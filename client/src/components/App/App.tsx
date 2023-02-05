import React from "react";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "../../pages/MainPage";

export const App: React.FC = () => (
    <Routes>
        {/* <Route path="/filters" element={<FiltersPage />} />
            <Route path="/filters/:owner/:name" element={<FiltersPage />} />
            <Route
                path="/player/:appId/:uid/:env"
                element={<PlayerWrapper />}
            />
            <Route path="/apps">
                <Route path="" element={<AppListPage />} />
                <Route path="new" element={<CreateAppIdPage />} />
                <Route path=":appid/new" element={<CreateAppIdPage />} />
                <Route path=":appid/*" element={<AppPage />} />
            </Route>
            <Route path="*" element={<PartOfAppWithHeader />} /> */}
        <Route path="/" element={<MainPage />} />
    </Routes>
);

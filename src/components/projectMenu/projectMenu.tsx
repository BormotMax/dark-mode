import React, { memo, useMemo } from 'react';
import {
  faBackpack,
  faClipboardUser,
  faFileLines,
  faSackDollar,
  faStopwatch,
} from '@fortawesome/pro-light-svg-icons';

import { Protected, ProtectedElse } from '../protected/protected';
import { FilesTab, NotesTab, TabGroup } from '../tabs';
import { ContactPreview } from '../contactPreview';
import { ProjectClient, ProjectFreelancer } from '../../types/custom';
import { QuoteProgress } from '../quote';
import { AddQuoteModal } from '../addQuoteModal';

import styles from './projectMenu.module.scss';
import { Features } from '../../permissions';

const TAB_INFO_FREELANCER = [
  { icon: faClipboardUser, header: 'People' },
  { icon: faFileLines, header: 'Notes' },
  { icon: faBackpack, header: 'Assets' },
];
const TAB_INFO_NON_FREELANCER = [
  { icon: faClipboardUser, header: 'People' },
  { icon: faBackpack, header: 'Assets' },
];
const TAB_INFO_FOOTER = [
  { icon: faStopwatch, header: 'Tasks & Time' },
  { icon: faSackDollar, header: 'Financial' },
];

const ProjectMenu = ({
  viewer,
  clients,
  freelancers,
  project,
  fetchProject,
  currentUserId,
  assets,
  quotes,
}) => {
  const currentViewer = viewer?.current || {};

  const users = useMemo(
    () => ([...clients?.items, ...freelancers?.items] as [ProjectClient | ProjectFreelancer]),
    [clients, freelancers],
  );
  const quotesBlock = useMemo(
    () => {
      if (!quotes.items.length) {
        return <div>There are no quotes, yet.</div>;
      }
      return (
        <>
          {quotes.items
            .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
            .map((quote, i) => <QuoteProgress key={quote.id} i={i + 1} quoteId={quote.id} />)}
        </>
      );
    },
    [quotes.items, fetchProject],
  );
  const userProjects = useMemo(
    () => project.freelancers.items.find(
      (freelancer: ProjectFreelancer) => currentUserId && freelancer?.user?.id === currentUserId,
    ),
    [project.freelancers, currentUserId],
  );

  return (
    <div className={styles.tabGroupWrapper}>
      <Protected feature={Features.InfoFreelancer}>
        <TabGroup tabInfos={TAB_INFO_FREELANCER}>
          <ContactPreview
            currentUser={currentViewer}
            users={users}
            projectID={project.id}
            refreshUsers={fetchProject}
          />
          <NotesTab
            projectUser={userProjects}
            refetchData={fetchProject}
          />
          <FilesTab projectID={project.id} files={assets.items} refetchData={fetchProject} />
        </TabGroup>
      </Protected>
      <ProtectedElse feature={Features.InfoNoNFreelancer}>
        <TabGroup tabInfos={TAB_INFO_NON_FREELANCER}>
          <ContactPreview
            currentUser={currentViewer}
            users={users}
            projectID={project.id}
            refreshUsers={fetchProject}
          />
          <FilesTab projectID={project.id} files={assets.items} refetchData={fetchProject} />
        </TabGroup>
      </ProtectedElse>
      <TabGroup tabInfos={TAB_INFO_FOOTER}>
        {quotesBlock}
        <AddQuoteModal
          quotes={quotes.items}
          projectID={project.id}
          refetchData={fetchProject}
          creator={currentViewer}
        />
      </TabGroup>
    </div>
  );
};

export default memo(ProjectMenu);

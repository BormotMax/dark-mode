import { Role } from './components/withAuthentication';

export enum Features {
  QuoteModalContent = 'quoteModalContent',
  InfoFreelancer = 'infoFreelancer',
  InfoNoNFreelancer = 'infoNoNFreelancer',
  ButtonAcceptAndPay = 'buttonAccept',
  CheckRoleFreelancer = 'checkRoleFreelancer',
  Header = 'header',
  HeaderText = 'headerText',
  HeaderBreadcrumb = 'headerBreadcrumb',
  MobileNav = 'mobileNav',
  MobileHeader = 'mobileHeader',
  DesktopNav = 'desktopNav',
  QuoteCheckList = 'quoteCheckList',
  QuoteNewTask = 'quoteNewTask',
  FileModalContent = 'fileModalContent',
  NotesTab = 'notesTab',
  Payments = 'payments',
}

export const permissions = {
  [Features.QuoteModalContent]: [Role.FREELANCER],
  [Features.InfoFreelancer]: [Role.FREELANCER],
  [Features.InfoNoNFreelancer]: [Role.FREELANCER],
  [Features.ButtonAcceptAndPay]: [Role.FREELANCER],
  [Features.CheckRoleFreelancer]: [Role.FREELANCER],
  [Features.Header]: [Role.FREELANCER],
  [Features.HeaderText]: [Role.FREELANCER],
  [Features.HeaderBreadcrumb]: [Role.FREELANCER],
  [Features.MobileNav]: [Role.FREELANCER],
  [Features.MobileHeader]: [Role.FREELANCER],
  [Features.DesktopNav]: [Role.FREELANCER],
  [Features.QuoteCheckList]: [Role.FREELANCER],
  [Features.QuoteNewTask]: [Role.FREELANCER],
  [Features.FileModalContent]: [Role.FREELANCER],
  [Features.NotesTab]: [Role.FREELANCER],
  [Features.Payments]: [Role.FREELANCER],
};

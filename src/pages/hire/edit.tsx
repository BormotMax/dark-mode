/* eslint-disable jsx-a11y/label-has-associated-control */
import classnames from 'classnames';
import { ProjectHeader } from '../../components/projectHeader';
import { WithAuthentication, RouteType } from '../../components/withAuthentication';
import { FileUpload } from '../../components/fileUpload';
import styles from '../styles/hireEdit.module.scss';

const HirePageEditor = () => (
  <div className="container is-desktop">
    <ProjectHeader headerText="Hire Page Editor" avatar="/avatar.jpg" />
    <main className={styles.main}>
      <div className={classnames('text-1', 'columns')}>
        <div className="column">
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input className="input" type="text" maxLength={48} size={35} />
            </div>
          </div>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input className="input" type="text" maxLength={32} size={35} />
            </div>
          </div>
          <div className="field">
            <label className="label">Button Text</label>
            <div className="control">
              <input className="input" type="text" maxLength={24} placeholder="Start a Conversation" />
            </div>
          </div>
          <div className="field">
            <label className="label">Blurb</label>
            <div className="control">
              <textarea maxLength={255} rows={3} className="textarea" />
            </div>
          </div>
          <div className="field">
            <label className="label">About</label>
            <div className="control">
              <textarea maxLength={1000} rows={18} className="textarea" />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="flex">
            <FileUpload name="banner" helpText="Banner Image (1600px x 640px - will be anchored left)" />
          </div>
          <div className="flex">
            <FileUpload name="portfolio-1" helpText="Portfolio Image 1 (1000px x 1000px)" />
            <FileUpload name="portfolio-2" helpText="Portfolio Image 2 (1000px x 1000px)" />

          </div>
          <div className="flex">
            <FileUpload name="portfolio-3" helpText="Portfolio Image 1 (1000px x 1000px)" />
            <FileUpload name="portfolio-4" helpText="Portfolio Image 2 (1000px x 1000px)" />

          </div>
          <div className="flex">
            <FileUpload name="portfolio-5z" helpText="Portfolio Image 1 (1000px x 1000px)" />
            <FileUpload name="portfolio-1" helpText="Portfolio Image 2 (1000px x 1000px)" />
          </div>
        </div>
      </div>
      <div className={styles.save}>
        <button type="button" className="oval-btn-2 oval-btn-2--inline">SAVE</button>
      </div>
    </main>
  </div>
);

export default WithAuthentication(HirePageEditor, { routeType: RouteType.SIGNED_IN });

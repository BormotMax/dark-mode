import tabStyle from './tab.module.scss';
import styles from './quotesTab.module.scss';
import { EditableList } from '../editableList';

export function QuotesTab({ data }) {
  function handleSaveAndSendQuote() {
    console.log('Saving and sending quote');
  }

  return (
    <div className={tabStyle.genericTab}>
      <div className={styles.editor}>
        <EditableList listItems={data.tasks} />
        <div className={styles.quoteLine}>
          <div className={styles.quoteLine__upper}>
            <div>Quote </div>
            <div>
              <input
                type="number"
                className="inline-input--2 text-blue"
              />
            </div>
            <div>billable&nbsp;hours&nbsp;</div>
          </div>
          <div className={styles.quoteLine__upper}>
            <div>x</div>
            <div className={`${styles.dollar_sign} text-blue`}> $</div>
            <div>
              <input
                type="number"
                className="inline-input--4 text-blue"
              />
            </div>
            <div>per&nbsp;hour.</div>
          </div>
        </div>
        <div className={styles.button_container}>
          <button type="button" onClick={handleSaveAndSendQuote} className="oval-btn">
            SAVE & SEND QUOTE
          </button>
        </div>
      </div>
    </div>
  );
}

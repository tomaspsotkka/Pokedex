import './ProgressBar.css';

const ProgressBar = ({ value, maxValue, label }) => {
  const filledBlocks = Math.ceil((value / maxValue) * 5); // 5 total blocks
  const percentage = (value / maxValue) * 100;

  let colorClass = 'small'; // this is default

  if (percentage > 70) {
    colorClass = 'large';
  } else if (percentage > 40) {
    colorClass = 'medium';
  }

  const blocks = [];

  for (let i = 1; i <= 5; i++) {
    blocks.push(
      <div key={i} className={`progress-block ${i <= filledBlocks ? colorClass : ''}`}></div>
    );
  }

  return (
    <div className="progress-bar-container">
      <span className="progress-label">{label}: {value}</span>
      <div className="progress-bar">
        {blocks}
      </div>
    </div>
  );
};

export default ProgressBar;

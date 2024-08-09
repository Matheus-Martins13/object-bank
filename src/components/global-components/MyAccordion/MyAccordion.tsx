import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { ReactNode, CSSProperties } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const MyAccordion = ({
  title,
  children,
  summaryClassName,
  summaryStyle,
  expandedIconStyle,
  titleClassName,
  detailClassName,
}: {
  title: string;
  children?: ReactNode;
  summaryClassName?: string;
  summaryStyle?: CSSProperties;
  expandedIconStyle?: CSSProperties;
  titleClassName: string;
  detailClassName: string;
}) => {
  return (
    <Accordion className="w-full">
      <AccordionSummary
        sx={{ borderRadius: '5px'}}
        expandIcon={
          <ExpandMoreIcon color="inherit" style={expandedIconStyle} />
        }
        aria-controls="panel2-content"
        id="panel2-header"
        className={summaryClassName}
        style={summaryStyle}
      >
        <p className={titleClassName}>{title}</p>
      </AccordionSummary>
      <AccordionDetails className={detailClassName}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

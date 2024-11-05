import { alpha, styled } from '@mui/material';
import type { ReactNode } from 'react';
import { useHighlightContext } from './HighlightContext';
import type { HighlightKey } from './HighlightProvider';

const StyledHighlight = styled('div', {
    shouldForwardProp: (prop) => prop !== 'highlighted',
})<{ highlighted: boolean }>(({ theme, highlighted }) => ({
    '&&& > *': {
        animation: highlighted ? 'pulse 1.5s infinite linear' : 'none',
        zIndex: highlighted ? theme.zIndex.tooltip : 'auto',
        transition: 'box-shadow 0.3s ease',
        '@keyframes pulse': {
            '0%': {
                boxShadow: `0 0 0 0px ${alpha(theme.palette.primary.main, 0.5)}`,
                transform: 'scale(1)',
            },
            '50%': {
                boxShadow: `0 0 0 15px ${alpha(theme.palette.primary.main, 0.2)}`,
                transform: 'scale(1.05)',
            },
            '100%': {
                boxShadow: `0 0 0 30px ${alpha(theme.palette.primary.main, 0)}`,
                transform: 'scale(1)',
            },
        },
    },
}));

interface IHighlightProps {
    highlightKey: HighlightKey;
    children: ReactNode;
}

export const Highlight = ({ highlightKey, children }: IHighlightProps) => {
    const { isHighlighted } = useHighlightContext();

    return (
        <StyledHighlight highlighted={isHighlighted(highlightKey)}>
            {children}
        </StyledHighlight>
    );
};

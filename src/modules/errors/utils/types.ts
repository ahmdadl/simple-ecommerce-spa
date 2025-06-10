import React from 'react';

export type ErrorAction = {
    label: string;
    icon: React.ReactNode;
    action: () => void;
};

export type ErrorConfigItem = {
    icon: React.ReactNode;
    title: string;
    description: string;
    primaryAction: ErrorAction;
    secondaryAction?: ErrorAction;
};

export type ErrorConfig = {
    [key in
        | '404'
        | '500'
        | 'offline'
        | 'forbidden'
        | 'generic']: ErrorConfigItem;
};

import { Trans } from '@lingui/react/macro';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
    component: RouteComponent,
    beforeLoad: () => {
        throw redirect({
            // @ts-ignore
            to: '/$locale',
            // @ts-ignore
            params: {
                locale: 'en',
            },
        });
    },
});

function RouteComponent() {
    return (
        <div>
            <Trans>Please wait a few seconds</Trans>
        </div>
    );
}

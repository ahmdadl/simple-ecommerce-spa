import { LinkComponent, Link as TanLink } from '@tanstack/react-router';
import useLocaleStore from '../stores/localeStore';

type LinkProps = LinkComponent<'a'> & { activeProps?: Record<string, string> };
type HtmlLinkElement = Omit<HTMLAnchorElement, 'children'>;

export default function Link(
    props: Omit<LinkProps, 'to'> &
        Partial<HtmlLinkElement> & {
            to: string;
            children: React.ReactNode;
            onClick?: () => void;
            preload?: boolean;
        }
) {
    const locale = useLocaleStore.use.locale();

    return (
        // @ts-ignore
        <TanLink {...props} to={`/${locale}${props.to}`} preload={false}>
            {props.children}
        </TanLink>
    );
}

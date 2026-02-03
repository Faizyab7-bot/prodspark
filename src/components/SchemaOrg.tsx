import { Helmet } from 'react-helmet-async';

interface SchemaOrgProps {
    data: any;
}

export const SchemaOrg = ({ data }: SchemaOrgProps) => {
    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(data)}
            </script>
        </Helmet>
    );
};

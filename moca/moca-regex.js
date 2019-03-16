let mocaregex ={};

mocaregex.data = [
    {
        Pks:'1111-111-1111',
        Regex:'\\d',
        description:'matches a single character that is a digit',
    },
    {
        Pks:'222-222-222-2222',
        Regex:'\\w',
        description:'matches a word character (alphanumeric character plus underscore)',
    },
    {
        Pks:'333-333-33333',
        Regex:'\\s',
        description:'matches a whitespace character (includes tabs and line breaks)',
    },
    {
        Pks:'4444-444-444',
        Regex:'\\s',
        description:'matches a whitespace character (includes tabs and line breaks)',
    },
    {
        Pks:'5555-5555-5555',
        Regex:'\\.',
        description:'matches any character ',
    },
];


mocaregex.getMoca = () => mocaregex.data;



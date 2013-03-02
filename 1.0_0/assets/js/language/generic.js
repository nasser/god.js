/**
 * Generic language patterns
 *
 * @author Craig Campbell
 * @version 1.0.9
 */
Rainbow.extend('god', [
    {
        'matches': {
            1: {
                'name': 'keyword.operator',
                'pattern': /\=/g
            },
            2: {
                'name': 'string',
                'matches': {
                    'name': 'constant.character.escape',
                    'pattern': /\\('|"){1}/g
                }
            }
        },
        'pattern': /(\(|\s|\[|\=|:)(('|")([^\\\1]|\\.)*?(\3))/gm
    },
    {
        'name': 'comment',
        'pattern': /\b(AMEN|SHALL BE|SHALL NOT BE|TOGETHER WITH|SHOULD YOU EXPOSE YOURSELF|LET THERE BE)\b/g
    },
    {
        'name': 'support',
        'pattern': /\b(THE NUMBER|THE WORD|THE VERSE)\b/g
    },
    {
        'name': 'constant.language',
        'pattern': /\b(LEST|LO|WILL RECITE|RECITE|THEY WILL RECITE|THEY RECITE|IT IS SAID IN THE BOOK OF|THE BOOK OF|THEY WILL SHOW|LET IT BE KNOWN AS|KNOWN AS|DECIDED BY THE HAND OF FATE|UPON YOUR KINGDOM COME|THEY WILL SAY|UPON ARRIVING AT A KINGDOM|TRAVEL TO THE KINGDOM)\b/g
    },
    {
        'matches': {
            1: 'function.call'
        },
        'pattern': /(\w+?)(?=\()/g
    },
    {
        'matches': {
            1: 'storage.function',
            2: 'entity.name.function'
        },
        'pattern': /(function)\s(.*?)(?=\()/g
    }
]);

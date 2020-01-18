const axios = require('../node_modules/axios');
const vhsCourses = require('../data/courses.json');

function getDescription(vhsText) {
    const description = vhsText.find(t => t.eigenschaft === 'Beschreibung');
    return description ? description.text : '';
}

function transformCourse(course) {
    return {
        guid: course.guid,
        number: course.nummer,
        title: course.name,
        subtitle: course.untertitel,
        tags: course.schlagwort,
        description: getDescription(course.text)
    }
}

function arrayToElasticBulk(arr) {
    return arr
        .map(el => JSON.stringify(el))
        .map(s => '{ "index": {} }\n' + s )
        .join('\n')
        + '\n'
        ;
}

async function uploadCourses(raw) {
    const courses = raw.veranstaltungen.veranstaltung.map(transformCourse);
    const bulk = arrayToElasticBulk(courses);
    try {
        const res = await axios.post('http://localhost:9200/vhs/courses/_bulk', bulk, {
            headers: {
                'Content-Type': 'application/x-ndjson'
            }
        });
        console.log(res);
    } catch (e) {
        console.log(e);
    }
}

uploadCourses(vhsCourses);
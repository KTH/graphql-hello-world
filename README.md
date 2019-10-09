# lms-export-to-ladok
 
This is a LTI integration that exports results from preselected
columns in the gradebook in a Canvas course room to draft results
_(studieresultat i status utkast)_ in Ladok.

This integration is implemented in javascript, which is built into a
Docker image by our CI.
The image is then deployed to our staging or active cluster.
Configuration is done by envirionment variables, see
[.env.in](.env.in) for required variable names.

See also:

* [A tool that exports to file (and does not touch ladok)](https://github.com/KTH/lms-export-results)
* [Alternative implementation in Rust](https://github.com/KTH/report-results-ladok-rs)
* [Alternative implementation in Java - Spring Boot](https://github.com/KTH/resultatrapportering-spring-boot)

## Prerequisities in Canvas

1. The students in Canvas are annotated with their Ladok uid as integration_id.

2. The course room is annotated with the Ladok uid for the
   administrative course instance _(kurstillfälle)_ as integration_id.

3. The exportable column(s) in the gradebook is annotated with the Ladok
   uid for the section _(moment)_, as integration_id.

4. This application is registerad as an LTI in Canvas, see
   Setup Canvas below.

## Usage

A teacher registers grades in the exportable column in the Canvas
gradebook.  The grades is given with the codes used in the Ladok grade
scale (e.g. `A`, `B`, .. `F` or `P`, `F`).

When done, the teacher clicks the LTI button in Canvas, and the grades
are exported to Ladok as draft results _(studieresultat i status utkast)_.
The teacher (or another teacher) then logs in to Ladok to
mark the results as ready _(klarmarkera)_.

Then the examiner can then certify _(attestera)_ the results in Ladok.

## Development

To run localy, do:

- `git clone git@github.com:KTH/lms-export-to-ladok.git`
- `npm i`
- `npm start`
- Follow the instructions in the terminal

## Setup Canvas

To launch this app from Canvas, you need to create a "button" (an external tool) there.

- Run `npm run setup`.

- Or do it manually:

  ```
  NAME="Skicka resultat till Ladok (BETA)"
  curl -X POST 'https://kth.test.instructure.com/api/v1/accounts/1/external_tools' \
       -H "Authorization: Bearer $CANVAS_TOKEN" \
       -F "name=$NAME" \
       -F 'consumer_key=not_used' \
       -F 'shared_secret=not_used' \
       -F "url=http://localhost:3002/export" \
       -F 'privacy_level=public' \
       -F 'course_navigation[visibility]=admins' \
       -F 'course_navigation[windowTarget]=_blank' \
       -F 'editor_button[enabled]=true' \
       -F "course_navigation[text]=$NAME" \
       -F 'course_navigation[default]=false' \
       -F 'course_navigation[enabled]=true'
  ```

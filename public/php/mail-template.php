<?php

function createEmailTemplate($params) {
    $emailAddress = $params['email'] ?? 'Email not specified';
    $name = $params['name'] ?? 'Name not specified';
    $message = $params['message'] ?? 'No message specified';
    $trainingType = $params['trainingType'] ?? '';
    $numEmployees = $params['numEmployees'] ?? 'No specified';
    $location = $params['location'] ?? 'No specified';
    $utm_source =  $params['utm_source'] ?? 'Unknown';
    $utm_term =  $params['utm_term'] ?? 'Unknown';

    $trainings = [
        'legacy_training' => 'Curso de Legacy',
        'tdd_training' => 'Curso de TDD',
        'docker_training' => 'Curso de Docker',
        'bootcamp_training' => 'Programa de aceleración',
        'development' => 'Desarrollo',
    ];

    $trainingTypeMessage = $trainings[$trainingType] ?? 'vosotros';

    $template = <<<EOS
        <style type="text/css">
            body {
                margin: 0;
                padding: 0;
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }

            table,
            td {
                border-collapse: collapse;
            }

            img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
                -ms-interpolation-mode: bicubic;
            }

            p {
                display: block;
                margin: 13px 0;
            }
        </style>

        <body style="background-color: #fafcfe; max-width: 600px; margin: 0 auto">
            <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="width: 100%">
                <tbody>
                    <tr>
                        <td style="padding: 20px 0">
                            <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                width="100%">
                                <tbody>
                                    <tr>
                                        <td style="vertical-align: top; padding-top: 16px">
                                            <table
                                                border="0"
                                                cellpadding="0"
                                                cellspacing="0"
                                                role="presentation"
                                                width="100%">
                                                <tr>
                                                    <td
                                                        align="center"
                                                        style="
                                                        font-size: 0px;
                                                        padding: 10px 25px;
                                                        word-break: break-word;">
                                                        <table
                                                            align="center"
                                                            border="0"
                                                            cellpadding="0"
                                                            cellspacing="0"
                                                            role="presentation"
                                                            style="border-collapse: collapse; border-spacing: 0px">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="width: 200px">
                                                                        <a
                                                                        href="https://www.codium.team/"
                                                                        target="_blank"
                                                                        >
                                                                            <img
                                                                                height="auto"
                                                                                src="https://www.codium.team/img/codium-black-200x46.png"
                                                                                style="
                                                                                display: block;
                                                                                height: auto;
                                                                                width: 100%;
                                                                                "
                                                                                width="200"
                                                                            />
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td
                            style="
                                direction: ltr;
                                font-size: 0px;
                                padding: 20px 0;
                                padding-left: 4%;
                                padding-right: 4%;
                                text-align: center;
                                vertical-align: top;">
                            <table
                                background="#fff"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                width="100%">
                                <tbody>
                                    <tr>
                                        <td
                                            style="
                                                background-color: #fff;
                                                vertical-align: top;
                                                padding-top: 32px;
                                                padding-bottom: 24px;">
                                            <table
                                                border="0"
                                                cellpadding="0"
                                                cellspacing="0"
                                                role="presentation"
                                                width="100%">
                                                <tr>
                                                    <td
                                                        align="left"
                                                        style="
                                                        font-size: 0px;
                                                        padding: 10px 25px;
                                                        word-break: break-word;">
                                                        <div
                                                            style="
                                                                font-family: -apple-system, system-ui, PingFang TC,
                                                                Noto Sans TC, Helvetica, sans-serif;
                                                                font-size: 15px;
                                                                line-height: 1;
                                                                text-align: left;
                                                                color: #353e3e;">
                                                            Hola!
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                        align="left"
                                                        style="
                                                        font-size: 0px;
                                                        padding: 10px 25px;
                                                        word-break: break-word;">
                                                        <div
                                                            style="
                                                                font-family: -apple-system, system-ui, PingFang TC,
                                                                Noto Sans TC, Helvetica, sans-serif;
                                                                font-size: 15px;
                                                                line-height: 160%;
                                                                text-align: left;
                                                                color: #353e3e;">
                                                            <p>
                                                                Mi nombre es <b>$name</b> y me pongo en
                                                                contacto para saber más sobre
                                                                <b>$trainingTypeMessage</b>
                                                            </p>
                                                            <p style="color: #838383; padding: 10px 10px 0px 0px">Message:</p>
                                                            <p style="color: #838383; padding: 10px">
                                                                <em>$message</em>
                                                            </p>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="font-size: 0px; word-break: break-word">
                                                        <p
                                                            style="
                                                            border-top: solid 1px #e6ecf1;
                                                            font-size: 1;
                                                            margin: 0px auto;
                                                            width: 100%;"></p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                        align="left"
                                                        style="
                                                        font-size: 0px;
                                                        padding: 10px 25px;
                                                        word-break: break-word;">
                                                        <div
                                                            style="
                                                                font-family: -apple-system, system-ui, PingFang TC,
                                                                Noto Sans TC, Helvetica, sans-serif;
                                                                font-size: 15px;
                                                                line-height: 200%;
                                                                text-align: left;
                                                                color: #8e9696;">
                                                        <b>Datos</b>
                                                        <br />
                                                        Nombre: <b>$name</b><br />

                                                        Email: <b>$emailAddress</b><br />

                                                        Empleados: <b>$numEmployees</b><br />

                                                        Localidad: <b>$location</b><br />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="font-size: 0px; word-break: break-word">
                                                        <p
                                                            style="
                                                            border-top: solid 1px #e6ecf1;
                                                            font-size: 1;
                                                            margin: 0px auto;
                                                            width: 100%;"></p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                        align="left"
                                                        style="
                                                        font-size: 0px;
                                                        padding: 10px 25px;
                                                        word-break: break-word;">
                                                        <div
                                                            style="
                                                                font-family: -apple-system, system-ui, PingFang TC,
                                                                Noto Sans TC, Helvetica, sans-serif;
                                                                font-size: 15px;
                                                                line-height: 200%;
                                                                text-align: left;
                                                                color: #8e9696;">
                                                        <b>Analytics</b>
                                                        <br />
                                                        Source: <b>$utm_source</b><br />

                                                        Searched terms: <b>$utm_term</b><br />
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </body>
    EOS;

    return $template;
}

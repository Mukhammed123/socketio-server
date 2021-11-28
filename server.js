const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: 'http://localhost:8081' }});

const PORT = 3000;

server.listen(PORT, () => {
    console.log('listening...');
});

io.on('connection', (socket) => {
    console.log('Connected')
    // REMARK ROOM
    socket.on('join-remark-room', async () => {
        await socket.join('remark-room');
        console.log(socket.id, ' Joined the remark room');
        socket.on('remark-changes', () => {
            socket.broadcast.to('remark-room').emit('remarkMessage');
        });
    });

    // NURSE SCHEDULE ROOM
    socket.on('join-nurse-schedule-room', async () => {
        await socket.join('nurse-schedule-room');
        console.log(socket.id, ' Joined the nurse schedule room');

        socket.on('nurse-schedule-changes', () => {
            console.log('nurse-schedule-changes called');
            socket.broadcast.to('nurse-schedule-room').emit('nurseScheduleMessage');
        });
    });

    // BED GROUP ROOM
    socket.on('join-bed-group-room', async () => {
        await socket.join('bed-group-room');
        console.log(socket.id, ' Joined the bed group room');

        socket.on('bed-group-changes', () => {
            console.log('bed-group-changes called');
            socket.broadcast.to('bed-group-room').emit('bedGroupMessage');
        })
    });

    // BED DATA ROOM
    socket.on('join-bed-data-room', async () => {
        await socket.join('bed-data-room');
        console.log(socket.id, ' Joined the bed data room');

        socket.on('bed-data-changes', () => {
            console.log('bed-data-changes called');
            socket.broadcast.to('bed-data-room').emit('bedDataMessage');
        })
    });

    // BED SCHEDULE ROOM
    socket.on('join-bed-schedule-room', async () => {
        await socket.join('bed-schedule-room');
        console.log(socket.id, ' Joined the bed schedule room');

        socket.on('bed-schedule-changes', () => {
            console.log('bed-schedule-changes called');
            socket.broadcast.to('bed-schedule-room').emit('bedScheduleMessage');
        })
    });

    // DOCTOR NOTICE ROOM
    socket.on('join-doctor-notice-room', async () => {
        await socket.join('doctor-notice-room');
        console.log(socket.id, ' Joined the doctor-notice room');

        socket.on('doctor-notice-changes', () => {
            console.log('doctor-notice-changes called');
            socket.broadcast.to('doctor-notice-room').emit('doctorNoticeMessage');
        });

        socket.on('doctor-notice-create', () => {
            console.log('doctor-notice-changes called');
            socket.broadcast.to('doctor-notice-room').emit('doctorNoticeCreate');
        });
    });

    // PATIENTS DATA ROOM
    socket.on('join-patient-data-room', async () => {
        await socket.join('patient-data-room');
        console.log(socket.id, ' Joined the patient data room');

        socket.on('patient-data-changes', () => {
            console.log('bed-schedule-changes called');
            socket.broadcast.to('patient-data-room').emit('patientDataMessage');
        })
    });
})

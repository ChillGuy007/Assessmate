import { getDatabase, initializeDatabase } from './database.js';
import bcrypt from 'bcryptjs';

async function seedDatabase() {
  console.log('🌱 Seeding database with sample data...');
  
  try {
    await initializeDatabase();
    const db = await getDatabase();

    // Check how many users already exist. We'll ensure at least 1000 users total.
    const existingUsers = await db.get('SELECT COUNT(*) as count FROM users');
    if (existingUsers.count >= 1000) {
      console.log(`📊 Database already has ${existingUsers.count} users. Skipping bulk seed.`);
      await db.close();
      return;
    }

    // Create sample users
    const hashedPassword1 = await bcrypt.hash('student123', 10);
    const hashedPassword2 = await bcrypt.hash('faculty123', 10);

    // Insert a few fixed users that are useful for testing
    const student1 = await db.run(
      `INSERT INTO users (email, password, role, first_name, last_name, institution)
       VALUES (?, ?, ?, ?, ?, ?)`,
      ['alex.johnson@university.edu', hashedPassword1, 'student', 'Alex', 'Johnson', 'University of Technology']
    );

    const student2 = await db.run(
      `INSERT INTO users (email, password, role, first_name, last_name, institution)
       VALUES (?, ?, ?, ?, ?, ?)`,
      ['maria.garcia@university.edu', hashedPassword1, 'student', 'Maria', 'Garcia', 'University of Technology']
    );

    // Insert faculty
    const faculty1 = await db.run(
      `INSERT INTO users (email, password, role, first_name, last_name, institution, phone)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      ['sarah.thompson@university.edu', hashedPassword2, 'faculty', 'Sarah', 'Thompson', 'University of Technology', '123-456-7890']
    );

    const faculty2 = await db.run(
      `INSERT INTO users (email, password, role, first_name, last_name, institution, phone)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      ['james.wilson@university.edu', hashedPassword2, 'faculty', 'James', 'Wilson', 'University of Technology', '098-765-4321']
    );

    // Insert courses
    const course1 = await db.run(
      `INSERT INTO courses (code, name, description, faculty_id, semester, year, max_students)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      ['CS101', 'Data Structures', 'Fundamentals of data structures and algorithms', faculty1.lastID, 'Fall', 2024, 50]
    );

    const course2 = await db.run(
      `INSERT INTO courses (code, name, description, faculty_id, semester, year, max_students)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      ['CS201', 'Artificial Intelligence', 'Introduction to machine learning and AI', faculty1.lastID, 'Spring', 2024, 40]
    );

    const course3 = await db.run(
      `INSERT INTO courses (code, name, description, faculty_id, semester, year, max_students)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      ['CS102', 'Web Development', 'Modern web technologies and frameworks', faculty2.lastID, 'Fall', 2024, 45]
    );

    // Insert enrollments
    await db.run(
      `INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)`,
      [student1.lastID, course1.lastID]
    );

    await db.run(
      `INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)`,
      [student1.lastID, course2.lastID]
    );

    await db.run(
      `INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)`,
      [student2.lastID, course1.lastID]
    );

    await db.run(
      `INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)`,
      [student2.lastID, course3.lastID]
    );

    // Insert sample feedback
    const feedbackSamples = [
      {
        student_id: student1.lastID,
        course_id: course1.lastID,
        faculty_id: faculty1.lastID,
        rating: 5,
        comment: 'Excellent course! The professor explains concepts very clearly and the assignments are well-structured.'
      },
      {
        student_id: student2.lastID,
        course_id: course1.lastID,
        faculty_id: faculty1.lastID,
        rating: 4,
        comment: 'Great content, though sometimes the pace could be a bit slow. Overall very good course.'
      },
      {
        student_id: student1.lastID,
        course_id: course2.lastID,
        faculty_id: faculty1.lastID,
        rating: 4,
        comment: 'Really interesting topics. Could use more practical examples but theoretical foundation is solid.'
      },
      {
        student_id: student2.lastID,
        course_id: course3.lastID,
        faculty_id: faculty2.lastID,
        rating: 3,
        comment: 'Good course but the material was confusing at times. The labs were helpful though.'
      }
    ];

    for (const feedback of feedbackSamples) {
      await db.run(
        `INSERT INTO feedback (student_id, course_id, faculty_id, rating, comment, sentiment)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          feedback.student_id,
          feedback.course_id,
          feedback.faculty_id,
          feedback.rating,
          feedback.comment,
          feedback.rating >= 4 ? 'positive' : (feedback.rating >= 3 ? 'neutral' : 'negative')
        ]
      );
    }

    // Bulk generate users up to 1000 total, plus historical feedback for analytics
    const currentCountRow = await db.get('SELECT COUNT(*) as count FROM users');
    const currentCount = currentCountRow.count;
    const targetCount = 1000;
    const toCreate = Math.max(0, targetCount - currentCount);

    if (toCreate > 0) {
      console.log(`🧩 Creating ${toCreate} additional users for demo...`);

      const firstNames = ['Liam','Olivia','Noah','Emma','Oliver','Ava','Elijah','Sophia','William','Isabella','James','Mia','Benjamin','Charlotte','Lucas','Amelia','Henry','Harper','Alexander','Evelyn','Michael','Abigail','Ethan','Emily','Daniel','Ella','Matthew','Avery','Joseph','Sofia'];
      const lastNames = ['Smith','Johnson','Williams','Brown','Jones','Miller','Davis','Garcia','Rodriguez','Wilson','Martinez','Anderson','Taylor','Thomas','Hernandez','Moore','Martin','Jackson','Thompson','White','Lopez','Lee','Gonzalez','Harris','Clark','Lewis','Robinson','Walker','Perez','Hall'];

      const studentIds = [];
      const facultyIds = [];

      // Determine desired number of faculty among the new users
      const desiredFaculty = Math.max(10, Math.floor(toCreate * 0.05)); // ~5% faculties
      let createdFaculty = 0;

      await db.exec('BEGIN TRANSACTION');

      // Cache existing emails to avoid UNIQUE constraint errors
      const existingEmailRows = await db.all('SELECT email FROM users');
      const existingEmails = new Set(existingEmailRows.map(r => r.email));

      for (let i = 0; i < toCreate; i++) {
        const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
        const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
        const unique = Math.floor(Math.random() * 10000);
        const email = `${fn.toLowerCase()}.${ln.toLowerCase()}${unique}@university.edu`;

        if (existingEmails.has(email)) {
          continue; // skip duplicates
        }

        const role = (createdFaculty < desiredFaculty) ? 'faculty' : 'student';

        const hashed = role === 'faculty' ? hashedPassword2 : hashedPassword1;

        const phone = role === 'faculty' ? `555-${Math.floor(100+Math.random()*900)}-${Math.floor(1000+Math.random()*9000)}` : null;

        try {
          console.log(`Attempting user insert: ${email} (role=${role})`);
          const res = await db.run(
            `INSERT INTO users (email, password, role, first_name, last_name, institution, phone) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [email, hashed, role, fn, ln, 'University of Technology', phone]
          );

          if (role === 'faculty') {
            facultyIds.push(res.lastID);
            createdFaculty++;
          } else {
            studentIds.push(res.lastID);
          }
          existingEmails.add(email);
        } catch (err) {
          // Ignore duplicate email collisions and continue
          if (err && err.code === 'SQLITE_CONSTRAINT') continue;
          throw err;
        }
      }

      // If not enough faculty were created (due to rounding), ensure at least some exist
      const existingFacultyRows = await db.all("SELECT id FROM users WHERE role='faculty'");
      const allFacultyIds = existingFacultyRows.map(r => r.id);
      if (allFacultyIds.length > facultyIds.length) facultyIds.push(...allFacultyIds.filter(id => !facultyIds.includes(id)));

      // Create additional demo courses assigned to random faculty
      const extraCourses = [];
      const coursePrefixes = ['CS','EE','MATH','BIO','ENG','HIST','PSY'];
      for (let i = 0; i < 30; i++) {
        const code = `${coursePrefixes[i % coursePrefixes.length]}${100 + i}`;
        const name = `Course ${code}`;
        const facultyId = facultyIds[Math.floor(Math.random() * facultyIds.length)];
        const res = await db.run(`INSERT INTO courses (code, name, description, faculty_id, semester, year, max_students) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [code, name, `Auto-generated course ${name}`, facultyId, 'Fall', 2023 + (i%2), 100]
        );
        extraCourses.push(res.lastID);
      }

      // Collect all course ids
      const courseRows = await db.all('SELECT id FROM courses');
      const courseIds = courseRows.map(r => r.id);

      // Enroll students randomly into 1-4 courses
      for (const sid of studentIds) {
        const enrollCount = 1 + Math.floor(Math.random() * 4);
        const chosen = new Set();
        for (let k = 0; k < enrollCount; k++) {
          const cid = courseIds[Math.floor(Math.random() * courseIds.length)];
          if (chosen.has(cid)) continue;
          chosen.add(cid);
          try {
            await db.run('INSERT INTO enrollments (student_id, course_id, enrolled_at) VALUES (?, ?, ?) ON CONFLICT (student_id, course_id) DO NOTHING', [sid, cid, new Date().toISOString()]);
          } catch (e) {
            // ignore unique constraint issues
          }
        }
      }

      // Generate historical feedback across the last 24 months for analytics
      const now = new Date();
      const monthsBack = 24;
      const feedbackComments = [
        'Great course, learned a lot.',
        'Material was challenging but fair.',
        'Enjoyed the labs and projects.',
        'Could use clearer explanations in lectures.',
        'Instructor was very supportive.',
        'Pace was a bit fast for me.',
        'Assignments were helpful and relevant.',
        'I struggled with exams but enjoyed the content.'
      ];

      const enrollmentRows = await db.all('SELECT * FROM enrollments');

      for (const enr of enrollmentRows) {
        // For each enrollment, create 0-3 feedback records distributed over time
        const feedbackCount = Math.random() < 0.6 ? 1 + Math.floor(Math.random() * 3) : 0; // 60% chance
        for (let f = 0; f < feedbackCount; f++) {
          const monthsAgo = Math.floor(Math.random() * monthsBack);
          const daysOffset = Math.floor(Math.random() * 28);
          const dt = new Date(now.getFullYear(), now.getMonth() - monthsAgo, now.getDate() - daysOffset, Math.floor(Math.random()*24), Math.floor(Math.random()*60), Math.floor(Math.random()*60));
          const rating = 1 + Math.floor(Math.random() * 5);
          const sentiment = rating >= 4 ? 'positive' : (rating >= 3 ? 'neutral' : 'negative');
          const comment = feedbackComments[Math.floor(Math.random() * feedbackComments.length)];

          await db.run(
            `INSERT INTO feedback (student_id, course_id, faculty_id, rating, comment, sentiment, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [enr.student_id, enr.course_id, null, rating, comment, sentiment, dt.toISOString(), dt.toISOString()]
          );
        }
      }

      // Fix faculty_id for feedback entries: set to course's faculty
      await db.run(`UPDATE feedback SET faculty_id = (SELECT faculty_id FROM courses WHERE courses.id = feedback.course_id) WHERE faculty_id IS NULL OR faculty_id = 0`);

      await db.exec('COMMIT');

      console.log(`🔢 Created ${toCreate} users, ${extraCourses.length} courses, and historical feedback.`);
    }

    // Recompute analytics cache from feedback
    console.log('📈 Recomputing analytics cache...');
    const courseIdsForAnalytics = (await db.all('SELECT id FROM courses')).map(r => r.id);
    await db.exec('BEGIN TRANSACTION');
    await db.run('DELETE FROM analytics');
    for (const cid of courseIdsForAnalytics) {
      const stats = await db.get(`SELECT COUNT(*) as total, AVG(rating) as avg_rating,
        SUM(CASE WHEN sentiment='positive' THEN 1 ELSE 0 END) as positive,
        SUM(CASE WHEN sentiment='neutral' THEN 1 ELSE 0 END) as neutral,
        SUM(CASE WHEN sentiment='negative' THEN 1 ELSE 0 END) as negative
        FROM feedback WHERE course_id = ?`, [cid]);

      await db.run(`INSERT INTO analytics (type, course_id, total_feedback, avg_rating, positive_sentiment, neutral_sentiment, negative_sentiment, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, ['course', cid, stats.total || 0, stats.avg_rating || 0, stats.positive || 0, stats.neutral || 0, stats.negative || 0, new Date().toISOString()]);
    }
    await db.exec('COMMIT');


    console.log('✅ Database seeded successfully!');
    console.log('📝 Sample credentials:');
    console.log('   Student: alex.johnson@university.edu / student123');
    console.log('   Faculty: sarah.thompson@university.edu / faculty123');

    await db.close();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();


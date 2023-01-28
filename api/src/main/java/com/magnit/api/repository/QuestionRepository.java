package com.magnit.api.repository;

import com.magnit.api.models.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
       List<Question> findByQueId(Long q_id);
}

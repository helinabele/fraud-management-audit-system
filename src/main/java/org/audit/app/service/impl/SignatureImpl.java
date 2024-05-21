package org.audit.app.service.impl;

import org.audit.app.service.dto.SignatureDTO;
import org.audit.app.service.mapper.SignatureMapper;

import java.util.Optional;

import org.audit.app.domain.Signature;
import org.audit.app.repository.SignatureRepository;
import org.audit.app.service.SignatureService;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Service Implementation for managing {@link Signature}.
 */
@Service
public class SignatureImpl implements SignatureService {
    private final Logger log = LoggerFactory.getLogger(SignatureImpl.class);

    private final SignatureRepository signatureRepository;

    private final SignatureMapper signatureMapper;

    public SignatureImpl(
        SignatureRepository signatureRepository,
        SignatureMapper signatureMapper
    ){
        this.signatureRepository = signatureRepository;
        this.signatureMapper = signatureMapper;
    }

    @Override
    public SignatureDTO save(SignatureDTO signatureDTO){
        log.debug("Request to save Signature : {}", signatureDTO);
        Signature signature = signatureMapper.toEntity(signatureDTO);
        signature = signatureRepository.save(signature);
        return signatureMapper.toDto(signature);
    }

    @Override
    public SignatureDTO update(SignatureDTO signatureDTO){
        log.debug("Request to update Signature : {}", signatureDTO);
        Signature signature = signatureMapper.toEntity(signatureDTO);
        signature = signatureRepository.save(signature);
        return signatureMapper.toDto(signature);
    }

    @Override
    public Optional<SignatureDTO> partialUpdate(SignatureDTO signatureDTO){
        log.debug("Request to partially update Signature : {}", signatureDTO);

        return signatureRepository
        .findById(signatureDTO.getId())
        .map(existingSignature -> {
            signatureMapper.partialUpdate(existingSignature, signatureDTO);

            return existingSignature;
        })
        .map(signatureRepository::save)
        .map(signatureMapper::toDto);
    }

    @Override
    public Page<SignatureDTO> findAll(Pageable pageable){
        log.debug("Request to get all signitures");
        return signatureRepository.findAll(pageable).map(signatureMapper::toDto);
    }

    @Override
    public Optional<SignatureDTO> findOne(String id){
        log.debug("Request to get Reoirt Repository : {}", id);
        return signatureRepository.findById(id).map(signatureMapper::toDto);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete Signature : {}", id);
        signatureRepository.deleteById(id);
    }


}
